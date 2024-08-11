import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/api/baseURL";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/sendEmail`, formData);
      toast.success("Your message has been sent successfully! 🥳");
    } catch (error) {
      toast.error(
        "There was an error sending your message. Please try again later! 🙁"
      );
    }

    setFormData({
      name: "",
      email: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="mt-5 flex justify-center items-center w-full p-2.5">
      <form
        onSubmit={handleSubmit}
        className="w-full p-7 bg-white rounded-3xl shadow-lg"
      >
        <h2 className="text-xl font-bold mb-6 text-text">Send a message! 😉</h2>

        <div className="mb-4">
          <label
            className="block text-soft-text text-sm font-semibold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-text border-border rounded-lg focus:outline-none focus:border-soft-text"
            placeholder="Your Name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-soft-text text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-text border-border rounded-lg focus:outline-none focus:border-soft-text"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-soft-text text-sm font-semibold mb-2"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border text-text border-border rounded-lg focus:outline-none focus:border-soft-text"
            placeholder="Your Message"
            rows="5"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-primary w-full text-white text-lg font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:shadow-outline hover:bg-dark-blue transition-all duration-300 ${
              isSubmitting && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Sending..." : "Send Message 🚀"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
