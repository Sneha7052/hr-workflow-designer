
import { Play, RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { simulateWorkflow } from '../../api/mock';

export default function SimulationPanel() {
  const { 
    nodes, 
    edges, 
    simulationLogs, 
    isSimulating, 
    setIsSimulating, 
    addSimulationLog, 
    clearSimulationLogs 
  } = useWorkflowStore();

  const handleSimulate = async () => {
    if (nodes.length === 0) {
      alert('Cannot simulate an empty workflow.');
      return;
    }
    
    clearSimulationLogs();
    setIsSimulating(true);
    
    try {
      await simulateWorkflow(nodes, edges, addSimulationLog);
      addSimulationLog('Simulation completed without errors.');
    } catch (error: any) {
      addSimulationLog(`Simulation failed: ${error.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="absolute bottom-4 right-88 left-72 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden flex flex-col z-10 transition-all duration-300 h-64 max-w-4xl mx-auto pointer-events-auto">
      <div className="bg-slate-800 text-white px-4 py-2 flex justify-between items-center shrink-0">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Play size={16} /> Workflow Simulation
        </h3>
        <div className="flex gap-2">
          <button
            onClick={clearSimulationLogs}
            disabled={isSimulating}
            className="p-1 hover:bg-slate-700 rounded transition-colors disabled:opacity-50 text-slate-300"
            title="Clear Logs"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-xs font-medium transition-colors disabled:opacity-50"
          >
            {isSimulating ? 'Simulating...' : 'Run Simulation'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-slate-900 font-mono text-sm">
        {simulationLogs.length === 0 ? (
          <div className="text-slate-500 flex flex-col items-center justify-center h-full gap-2">
            <Play size={32} className="opacity-20" />
            <p>Run a simulation to see execution logs.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {simulationLogs.map((log, index) => {
              const isError = log.includes('ERROR') || log.includes('failed');
              const isSuccess = log.includes('successfully') || log.includes('completed');
              
              return (
                <li key={index} className={`flex gap-2 ${isError ? 'text-rose-400' : isSuccess ? 'text-emerald-400' : 'text-slate-300'}`}>
                  <span className="opacity-50 select-none">[{index + 1}]</span>
                  <span>
                    {isError && <AlertCircle size={14} className="inline mr-1 -mt-0.5" />}
                    {isSuccess && <CheckCircle2 size={14} className="inline mr-1 -mt-0.5" />}
                    {log}
                  </span>
                </li>
              );
            })}
            {isSimulating && (
              <li className="text-slate-500 animate-pulse flex gap-2">
                <span className="opacity-50">[{simulationLogs.length + 1}]</span>
                <span>Executing next step...</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
