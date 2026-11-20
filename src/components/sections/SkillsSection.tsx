import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Code, 
  Database, 
  Terminal, 
  Table, 
  Binary, 
  BarChart3, 
  Brain, 
  Cpu, 
  PieChart, 
  LineChart, 
  LayoutDashboard,
  Sparkles,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';

interface SkillsSectionProps {
  onOpenAdminModal?: (tab?: string) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ onOpenAdminModal }) => {
  const { skillCategories, deleteSkill } = useData();
  const { isAdmin } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const renderIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'python': return <Terminal className="w-5 h-5 text-amber-500" />;
      case 'database':
      case 'sql': return <Database className="w-5 h-5 text-sky-500" />;
      case 'code': return <Code className="w-5 h-5 text-indigo-500" />;
      case 'table':
      case 'pandas': return <Table className="w-5 h-5 text-blue-500" />;
      case 'binary':
      case 'numpy': return <Binary className="w-5 h-5 text-teal-500" />;
      case 'bar-chart-3':
      case 'chart': return <BarChart3 className="w-5 h-5 text-emerald-500" />;
      case 'brain':
      case 'machine learning': return <Brain className="w-5 h-5 text-purple-500" />;
      case 'cpu':
      case 'xgboost':
      case 'boost': return <Cpu className="w-5 h-5 text-rose-500" />;
      case 'pie-chart':
      case 'matplotlib': return <PieChart className="w-5 h-5 text-orange-500" />;
      case 'line-chart':
      case 'seaborn': return <LineChart className="w-5 h-5 text-cyan-500" />;
      case 'layout-dashboard':
      case 'dashboard':
      case 'tableau': return <LayoutDashboard className="w-5 h-5 text-indigo-400" />;
      default: return <Code className="w-5 h-5 text-indigo-500" />;
    }
  };

  const categories = ['All', ...skillCategories.map(c => c.category)];

  const displayedCategories = activeCategory === 'All'
    ? skillCategories
    : skillCategories.filter(c => c.category === activeCategory);

  return (
    <section id="skills" className="py-20 relative bg-transparent transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-indigo-600 dark:text-sky-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Technical Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
              Skills & Proficiencies
            </h2>
          </div>

          {isAdmin && (
            <div className="mt-4 sm:mt-0 flex gap-2">
              <button
                onClick={() => onOpenAdminModal?.('skills')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-sky-400 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add / Manage Skills
              </button>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-portfolio-brush dark:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Categories & Skills Cards with 3D colorful accents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((catGroup, cIdx) => {
            const barGradients = [
              'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600',
              'bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500',
              'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500',
              'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500'
            ];
            const currentGradient = barGradients[cIdx % barGradients.length];

            return (
              <div
                key={catGroup.category}
                className="glass-panel p-6 sm:p-7 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-5 border border-indigo-100 dark:border-white/10"
              >
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800 pb-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    {catGroup.category}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    {catGroup.skills.length} skills
                  </span>
                </div>

                <div className="space-y-4">
                  {catGroup.skills.map((skill) => (
                    <div key={skill.name} className="group relative">
                      <div className="flex items-center justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 shadow-sm group-hover:scale-110 transition-transform">
                            {renderIcon(skill.icon || skill.name)}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-100">
                            {skill.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-indigo-600 dark:text-sky-400 font-bold">
                            {skill.level}%
                          </span>
                          {isAdmin && (
                            <button
                              onClick={() => deleteSkill(catGroup.category, skill.name)}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                              title="Delete skill"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Dynamic 3D Progress Bar */}
                      <div className="h-2.5 w-full bg-slate-200/70 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                        <div
                          className={`h-full ${currentGradient} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
