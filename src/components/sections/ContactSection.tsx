import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { isValidUrl } from '../../lib/utils';
import { Button } from '../common/Button';
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  Loader2, 
  CheckCircle2, 
  Github, 
  Linkedin 
} from 'lucide-react';
import { submitContactMessage } from '../../lib/api';

interface ContactSectionProps {
  onShowToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const { profile, settings } = useData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '' // Spam prevention honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check (bot submission silently ignored)
    if (formData.honeypot) {
      setIsSent(true);
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill out all fields before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      if (res.success) {
        setIsSent(true);
        onShowToast(res.message, 'success');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      }
    } catch {
      onShowToast('Could not send message. Please try emailing directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasGithub = isValidUrl(profile?.socials.github);
  const hasLinkedin = isValidUrl(profile?.socials.linkedin);

  return (
    <section id="contact" className="py-20 relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-t border-portfolio-brush/50 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Let's Discuss Opportunities
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Open for Data Science internships and entry-level Data Science positions. Reach out for projects, collaboration, or recruitment.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-6 border border-portfolio-brush dark:border-white/10">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-mono text-[10px]">Email</p>
                    <a
                      href={`mailto:${profile?.email}`}
                      className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-sky-400 text-sm transition-colors"
                    >
                      {profile?.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-mono text-[10px]">Location</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                      {profile?.location}
                    </p>
                  </div>
                </div>

                {/* Phone (Shown ONLY when enabled in Settings) */}
                {settings?.showPhone && profile?.phone && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-slate-400 uppercase font-mono text-[10px]">Phone</p>
                      <a
                        href={`tel:${profile.phone}`}
                        className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-600 text-sm"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <p className="text-xs font-mono uppercase text-slate-400 mb-3">
                  Profiles
                </p>
                <div className="flex items-center gap-3">
                  {hasLinkedin && (
                    <a
                      href={profile?.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-indigo-600 hover:text-white transition-all text-xs font-semibold shadow-sm"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}

                  {hasGithub && (
                    <a
                      href={profile?.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all text-xs font-semibold shadow-sm"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm border border-portfolio-brush dark:border-white/10">
              {isSent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Thank you for reaching out. Rohith has received your note and will reply soon.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSent(false)}
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="website_url"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="priya@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Hi Rohith, I'd like to discuss a Data Science opportunity..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmitting}
                      icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
