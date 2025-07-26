import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Input } from "./input";
import { Button } from "./button";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ProfileModal({ isOpen, onClose }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("session");
  const userId = localStorage.getItem("userid");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen || !token || !userId) {
      if (isOpen && (!token || !userId)) {
        navigate("/login");
        onClose();
      }
      return;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`http://localhost:5000/users/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.id) {
          setCurrentUser(result);
          setName(result.name);
          setEmail(result.email);
        } else {
          const message =
            typeof result.message === "object"
              ? Object.values(result.message)[0]
              : result.message;
          toast.error(message || "Failed to fetch user profile", {
            duration: 4000,
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Failed to fetch user profile", {
          duration: 4000,
          position: "top-center",
        });
      });
  }, [isOpen, token, userId]);

  const handleUpdate = () => {
    if (!token || !userId) {
      navigate("/login");
      onClose();
      return;
    }

    if (!name.trim()) {
      toast.error("Name cannot be empty", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    };

    fetch(`http://localhost:5000/users/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.id) {
          setCurrentUser(result);
          setIsEditing(false);
          toast.success("Profile updated", {
            duration: 4000,
            position: "top-center",
          });
        } else {
          const message =
            typeof result.message === "object"
              ? Object.values(result.message)[0]
              : result.message;
          toast.error(message || "Failed to update profile", {
            duration: 3000,
            position: "top-center",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Failed to update profile", {
          duration: 3000,
          position: "top-center",
        });
      });
  };

  if (!isOpen) return null;

  if (!currentUser) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
          </DialogHeader>
          <div className="text-center p-6">
            <p>Loading profile...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const signupDate = currentUser.created_at
    ? new Date(currentUser.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not available";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="font-medium text-sm">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="font-medium text-sm">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleUpdate}>Save</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setName(currentUser.name);
                      setEmail(currentUser.email);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm">
                  <span className="font-medium">Name: </span>
                  {currentUser.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email: </span>
                  {currentUser.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Role: </span>
                  {currentUser.role}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Signed Up: </span>
                  {signupDate}
                </p>
                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => {
                      setIsEditing(true);
                      setName(currentUser.name);
                      setEmail(currentUser.email);
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileModal;
