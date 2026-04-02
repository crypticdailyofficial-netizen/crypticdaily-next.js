'use client';

import { useState } from "react";
import type { Metadata } from "next";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, POST to /api/contact or use a form service
    setSent(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold font-heading text-[#F9FAFB] mb-3">Contact Us</h1>
      <p className="text-[#9CA3AF] mb-10">Have a story tip, partnership inquiry, or feedback? We'd love to hear from you.</p>

      {sent ? (
        <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-8 text-center">
          <p className="text-4xl mb-4">✅</p>
          <h2 className="text-xl font-bold font-heading text-[#F9FAFB] mb-2">Message Sent!</h2>
          <p className="text-[#9CA3AF]">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
            { id: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
            { id: "subject", label: "Subject", type: "text", placeholder: "Story tip, partnership, feedback..." },
          ].map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-[#F9FAFB] mb-2">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => setFormData((prev) => ({ ...prev, [field.id]: e.target.value }))}
                required
                className="w-full bg-[#111827] border border-[#1E2A3A] rounded-xl px-4 py-3 text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#00D4FF]/50 transition-all duration-200"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#F9FAFB] mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-[#111827] border border-[#1E2A3A] rounded-xl px-4 py-3 text-[#F9FAFB] placeholder-[#4B5563] focus:outline-none focus:border-[#00D4FF]/50 resize-none transition-all duration-200"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-[#00D4FF] text-[#0A0F1E] font-bold rounded-xl hover:bg-[#00B8E0] hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-200">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
