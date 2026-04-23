import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { PlayCircle } from 'lucide-react';
import type { WorkflowNodeData } from '../types/workflow';

export const StartNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => {
  return (
    <div className={`px-4 py-3 shadow-md rounded-xl bg-white border-2 min-w-[200px] ${
      selected ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-slate-200'
    } transition-all duration-200`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
          <PlayCircle size={20} />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800">{data.title || 'Start'}</div>
          <div className="text-xs text-slate-500">Entry point</div>
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-emerald-500 border-2 border-white"
      />
    </div>
  );
};
