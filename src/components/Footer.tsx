import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                SB
              </div>
              <span className="text-xl font-bold tracking-tight text-white">SocialBuzz</span>
            </div>
            <p className="text-text-muted text-sm max-w-xs mb-6">
              Plan smarter. Get approved. Publish seamlessly.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#product" className="hover:text-primary transition-colors">Product</a></li>
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#workflow" className="hover:text-primary transition-colors">Workflow</a></li>
              <li><a href="#preview" className="hover:text-primary transition-colors">Interactive Preview</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Project Details</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>Case Study No. 119</li>
              <li>Atharva Ghaine | Roll No. 150096724079</li>
              <li>B.Tech CSE</li>
              <li>Software Engineering & Project Management</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted/60 text-center md:text-left">
            Proposed system for academic demonstration. Not connected to live social publishing services.
          </p>
          <p className="text-xs text-text-muted/60">
            &copy; {new Date().getFullYear()} SocialBuzz Concept
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
