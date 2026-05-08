import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, AlertCircle } from "lucide-react";

interface ComingSoonProps {
  role: string;
  userName?: string;
  onBack?: () => void;
}

export default function ComingSoon({
  role,
  userName,
  onBack,
}: ComingSoonProps) {
  const getRoleInfo = (role: string) => {
    const roleMap: Record<
      string,
      { title: string; description: string; icon: string }
    > = {
      founder: {
        title: "Founder Dashboard",
        description:
          "Build your company, manage teams, and scale your ventures with our comprehensive founder tools.",
        icon: "🚀",
      },
      investor: {
        title: "Investor Portal",
        description:
          "Discover verified talent and investment opportunities with detailed analytics and insights.",
        icon: "💰",
      },
      recruiter: {
        title: "Recruiter Hub",
        description:
          "Access our verified talent pool and streamline your hiring process with advanced matching.",
        icon: "👥",
      },
      learner: {
        title: "Learning Platform",
        description:
          "Learn from industry experts and build your skills with our comprehensive learning resources.",
        icon: "📚",
      },
    };

    return (
      roleMap[role] || {
        title: "Feature Coming Soon",
        description: "We're working on bringing you this amazing feature.",
        icon: "✨",
      }
    );
  };

  const roleInfo = getRoleInfo(role);

  const handleBack = () => {
    onBack?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#0f0f11] text-slate-100 flex items-center justify-center px-6 py-12"
    >
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl border border-white/10 bg-[#0f0f11]/50 backdrop-blur-sm p-12 shadow-xl shadow-indigo-500/10 text-center"
        >
          {/* Back Button */}
          <div className="flex justify-start mb-8">
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-white/5"
              onClick={handleBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>

          {/* Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-6 inline-block"
          >
            {roleInfo.icon}
          </motion.div>

          {/* Alert Box */}
          <div className="mb-8 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
            <div className="flex items-center justify-center gap-3 text-cyan-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">Coming Soon</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
            {roleInfo.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto">
            {roleInfo.description}
          </p>

          {/* Welcome Message */}
          {userName && (
            <div className="mb-10 p-6 rounded-2xl bg-indigo-950/30 border border-indigo-900/50">
              <p className="text-indigo-300">
                Welcome to NOVA,{" "}
                <span className="font-bold text-white">{userName}</span>!
              </p>
              <p className="text-sm text-slate-400 mt-2">
                We're preparing an amazing experience for {role}s. Stay tuned!
              </p>
            </div>
          )}

          {/* Features Coming */}
          <div className="mb-12 grid md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-left"
            >
              <div className="font-semibold text-white mb-2">
                ✓ Upcoming Features
              </div>
              <p className="text-sm text-slate-400">
                Advanced tools and analytics tailored for your role
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-left"
            >
              <div className="font-semibold text-white mb-2">
                ✓ Early Access
              </div>
              <p className="text-sm text-slate-400">
                Be among the first to access exclusive features
              </p>
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleBack}
              className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-semibold"
            >
              Return to Landing
            </Button>

            <Button className="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-semibold">
              Notify Me When Ready
            </Button>
          </div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mt-12 pt-8 border-t border-white/5"
          >
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <Rocket className="w-4 h-4" />
              More features launching soon
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
