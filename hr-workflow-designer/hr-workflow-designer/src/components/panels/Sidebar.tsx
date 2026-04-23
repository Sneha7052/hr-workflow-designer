import React from 'react';
import { PlayCircle, ClipboardList, CheckSquare, Zap, StopCircle } from 'lucide-react';


const nodeTemplates = [
  { type: 'startNode', label: 'Start', icon: PlayCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'border-emerald-200' },
  { type: 'taskNode', label: 'Task', icon: ClipboardList, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'border-indigo-200' },
  { type: 'approvalNode', label: 'Approval', icon: CheckSquare, color: 'text-amber-600', bg: 'bg-amber-100', border: 'border-amber-200' },
  { type: 'automatedStepNode', label: 'Automated Step', icon: Zap, color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-200' },
  { type: 'endNode', label: 'End', icon: StopCircle, color: 'text-rose-600', bg: 'bg-rose-100', border: 'border-rose-200' },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm z-10 relative">
      <div className="p-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Nodes</h2>
        <p className="text-xs text-slate-500 mt-1">Drag and drop to canvas</p>
      </div>
      
      <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-1">
        {nodeTemplates.map((template) => {
          const Icon = template.icon;
          return (
            <div
              key={template.type}
              className={`flex items-center gap-3 p-3 rounded-lg border bg-white cursor-grab hover:shadow-md transition-all duration-200 ${template.border}`}
              onDragStart={(event) => onDragStart(event, template.type)}
              draggable
            >
              <div className={`w-8 h-8 rounded-md flex items-center justify-center ${template.bg} ${template.color}`}>
                <Icon size={18} />
              </div>
              <span className="font-medium text-sm text-slate-700">{template.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="text-xs text-slate-500 leading-relaxed">
          <strong>Tip:</strong> You can only have one Start node. Make sure your workflow ends with an End node.
        </div>
      </div>
    </aside>
  );
}
