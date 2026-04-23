import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { ClipboardList } from 'lucide-react';
import type { WorkflowNodeData } from '../types/workflow';

export const TaskNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => {
  return (
    <div className={`px-4 py-3 shadow-md rounded-xl bg-white border-2 min-w-[220px] ${
      selected ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200'
    } transition-all duration-200`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-indigo-100 flex items-center justify-center text-indigo-600">
          <ClipboardList size={20} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-800">{data.title || 'Task'}</div>
          {data.assignee && (
            <div className="text-xs text-slate-500 truncate mt-0.5">Assignee: {data.assignee}</div>
          )}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />
    </div>
  );
};
