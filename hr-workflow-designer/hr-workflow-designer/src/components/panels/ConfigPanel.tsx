import React from 'react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { X } from 'lucide-react';
import type { WorkflowNode, WorkflowNodeData } from '../../types/workflow';

export default function ConfigPanel() {
  const { nodes, selectedNodeId, updateNodeData, setSelectedNodeId } = useWorkflowStore();
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  
  if (!selectedNode) return null;

  return (
    <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-sm z-10 absolute right-0 top-0 bottom-0">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Configuration</h2>
          <p className="text-xs text-slate-500 mt-1 capitalize">{selectedNode.type?.replace('Node', ' Node')}</p>
        </div>
        <button 
          onClick={() => setSelectedNodeId(null)}
          className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1">
        <NodeForm node={selectedNode} updateData={(data) => updateNodeData(selectedNode.id, data)} />
      </div>
    </aside>
  );
}

function NodeForm({ node, updateData }: { node: WorkflowNode, updateData: (data: Partial<WorkflowNodeData>) => void }) {
  const { data, type } = node;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // For autoApproveThreshold, we want a number
    if (name === 'autoApproveThreshold') {
      updateData({ [name]: value ? Number(value) : undefined });
    } else {
      updateData({ [name]: value });
    }
  };

  const renderCommonFields = () => (
    <div className="mb-4">
      <label className="block text-xs font-medium text-slate-700 mb-1">Title</label>
      <input
        type="text"
        name="title"
        value={data.title || ''}
        onChange={handleChange}
        className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        placeholder="Node Title"
      />
    </div>
  );

  switch (type) {
    case 'startNode':
      return (
        <div className="space-y-4">
          {renderCommonFields()}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Metadata (JSON)</label>
            <textarea
              name="metadata"
              value={data.metadata ? JSON.stringify(data.metadata) : ''}
              onChange={(e) => {
                try {
                  const val = e.target.value ? JSON.parse(e.target.value) : undefined;
                  updateData({ metadata: val });
                } catch(e) {
                  // ignore invalid json while typing
                }
              }}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder='{"source": "web"}'
            />
          </div>
        </div>
      );
      
    case 'taskNode':
      return (
        <div className="space-y-4">
          {renderCommonFields()}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Assignee</label>
            <input
              type="text"
              name="assignee"
              value={data.assignee || ''}
              onChange={handleChange}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. hr@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Description</label>
            <textarea
              name="description"
              value={data.description || ''}
              onChange={handleChange}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Task instructions..."
            />
          </div>
        </div>
      );
      
    case 'approvalNode':
      return (
        <div className="space-y-4">
          {renderCommonFields()}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Approver Role</label>
            <select
              name="approverRole"
              value={data.approverRole || ''}
              onChange={handleChange}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Select Role...</option>
              <option value="Manager">Manager</option>
              <option value="Director">Director</option>
              <option value="HR Lead">HR Lead</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Auto-Approve Threshold (Days)</label>
            <input
              type="number"
              name="autoApproveThreshold"
              value={data.autoApproveThreshold || ''}
              onChange={handleChange}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. 3"
            />
          </div>
        </div>
      );
      
    case 'automatedStepNode':
      return (
        <div className="space-y-4">
          {renderCommonFields()}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Action</label>
            <select
              name="actionId"
              value={data.actionId || ''}
              onChange={handleChange}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="">Select Action...</option>
              <option value="send_email">Send Email</option>
              <option value="generate_doc">Generate Document</option>
              <option value="update_db">Update Database</option>
            </select>
          </div>
        </div>
      );

    case 'endNode':
      return (
        <div className="space-y-4">
          {renderCommonFields()}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">End Message</label>
            <input
              type="text"
              name="endMessage"
              value={data.endMessage || ''}
              onChange={handleChange}
              className="w-full text-sm border border-slate-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Workflow completed."
            />
          </div>
        </div>
      );
      
    default:
      return <div>Select a node</div>;
  }
}
