
import WorkflowCanvas from './components/canvas/WorkflowCanvas';
import Sidebar from './components/panels/Sidebar';
import ConfigPanel from './components/panels/ConfigPanel';
import SimulationPanel from './components/panels/SimulationPanel';

function App() {
  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden flex-col">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 shadow-sm z-10">
        <h1 className="text-xl font-semibold text-slate-800 tracking-tight">HR Workflow Designer</h1>
      </header>
      
      <main className="flex flex-1 overflow-hidden relative">
        <Sidebar />
        
        <div className="flex-1 relative">
          <WorkflowCanvas />
        </div>
        
        <ConfigPanel />
        <SimulationPanel />
      </main>
    </div>
  );
}

export default App;
