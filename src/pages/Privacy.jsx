import React from "react";


export default function PrivacyAndTerms() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#004c4c] mb-6 text-center">
          Privacy Policy & Terms of Service
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0f7c7c] mb-2">Privacy Policy</h2>
          <p className="text-gray-700 mb-4 text-sm">
            At Spacer, we are committed to protecting your personal information. We only collect data necessary
            to provide our services, such as your name, email address, and booking preferences.
          </p>
          <p className="text-gray-700 mb-4 text-sm">
            Your data is stored securely and is never shared with third parties without your consent. We use encrypted
            payment gateways and industry-standard security protocols to protect your transactions.
          </p>
          <p className="text-gray-700 mb-4 text-sm">
            You have the right to request access to or deletion of your data at any time. Please contact us at
            support@spacer.com for any concerns.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-[#0f7c7c] mb-2">Terms of Service</h2>
          <p className="text-gray-700 mb-4 text-sm">
            By using Spacer, you agree to comply with our community guidelines and booking policies. Users must provide
            accurate information when creating accounts or listings and respect the terms of each space they book.
          </p>
          <p className="text-gray-700 mb-4 text-sm">
            Cancellations, refunds, and disputes are subject to the specific cancellation policy associated with each
            listing. Spacer reserves the right to suspend or remove users who violate our policies.
          </p>
          <p className="text-gray-700 mb-4 text-sm">
            All content on this platform, including listings, designs, and logos, are the property of Spacer and
            may not be copied or reproduced without permission.
          </p>
        </section>

        <section className="text-sm text-gray-600 text-center">
          Last updated: July 28, 2025<br />
          For questions, contact us at <a href="mailto:support@spacer.com" className="text-[#0f7c7c] hover:underline">support@spacer.com</a>.
        </section>
      </div>
    </div>
  );
}
