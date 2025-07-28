export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 sm:px-12">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center text-[#004c4c]">About Spacer</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0f7c7c]">Who We Are</h2>
          <p>
            Spacer is a modern platform designed to help you easily find, book, and manage
            spaces for all kinds of events — from weddings and conferences to studio rentals and
            casual meetups. Whether you're a space owner or someone looking for the perfect spot,
            we’re here to simplify the process.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0f7c7c]">Our Mission</h2>
          <p>
            To connect people with unique, available spaces at their fingertips. We aim to
            streamline space discovery while empowering owners to earn more from unused venues.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0f7c7c]">Why Choose Spacer?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>✔️ Curated listings with detailed info and photos</li>
            <li>✔️ Real-time availability & easy bookings</li>
            <li>✔️ Secure, transparent transactions</li>
            <li>✔️ Friendly customer support</li>
            <li>✔️ Tools for space owners to manage listings and bookings</li>
          </ul>
        </section>

        {/* Optional: Add team section */}
        {/* 
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#0f7c7c]">Meet Our Team</h2>
          <p>Coming soon! Stay tuned for the faces behind Spacer.</p>
        </section>
        */}

        <div className="text-center pt-8">
          <p className="text-gray-600 italic">
            Empowering space discovery across Kenya and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}
