import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Code, User } from 'lucide-react';

const ProjectInfo: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent"
          >
            <div className="bg-surface/80 backdrop-blur-xl rounded-[23px] p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-text-muted mb-6">
                    <GraduationCap size={14} />
                    <span>Academic Project Demonstration</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">A proposed solution to a real workflow challenge.</h2>
                  <p className="text-text-muted leading-relaxed mb-6">
                    This landing page and interactive prototype represent the proposed frontend interface for SocialBuzz, a system designed to address content scheduling and approval bottlenecks in digital marketing agencies.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/5">
                    <div>
                      <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                        <BookOpen size={16} /> Case Study
                      </div>
                      <p className="text-white font-medium">No. 119</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-text-muted text-sm mb-1">
                        <Code size={16} /> Project Type
                      </div>
                      <p className="text-white font-medium text-sm">Social Media Scheduling & Approval Tool</p>
                    </div>
                  </div>
                </div>

                <div className="md:w-72 flex-shrink-0 bg-surface-light rounded-2xl p-6 border border-white/5 h-fit">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Student</p>
                      <p className="text-white font-medium">Atharva Ghaine</p>
                    </div>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-text-muted mb-1">Roll No.</p>
                      <p className="text-white">150096724079</p>
                    </div>
                    <div>
                      <p className="text-text-muted mb-1">Programme</p>
                      <p className="text-white">B.Tech – CSE</p>
                    </div>
                    <div>
                      <p className="text-text-muted mb-1">Course</p>
                      <p className="text-white">Software Engineering & Project Management</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
