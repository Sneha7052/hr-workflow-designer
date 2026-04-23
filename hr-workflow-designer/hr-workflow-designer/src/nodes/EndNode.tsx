import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { StopCircle } from 'lucide-react';
import type { WorkflowNodeData } from '../types/workflow';

export const EndNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => {
  return (
    <div className={`px-4 py-3 shadow-md rounded-xl bg-white border-2 min-w-[200px] ${
      selected ? 'border-rose-500 ring-2 ring-rose-200' : 'border-slate-200'
    } transition-all duration-200`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-rose-500 border-2 border-white"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
          <StopCircle size={20} />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800">{data.title || 'End'}</div>
          <div className="text-xs text-slate-500">Termination point</div>
        </div>
      </div>
    </div>
  );
};
