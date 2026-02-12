import { useEffect, useState } from "react";
import { getAllTasks, createTask, deleteTask, updateTask } from "../api/taskApi";
import type { Task } from "../types/task";

const Home = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchTasks = async () => {
        const data = await getAllTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title || !description) return;

        await createTask({ title, description });

        setTitle("");
        setDescription("");

        fetchTasks();
    };

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        fetchTasks();
    };

    const handleStatusChange = async (
        id: string,
        status: "todo" | "in_progress" | "done"
    ) => {
        await updateTask(id, { status });
        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-400 selection:bg-indigo-500/30">
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* HEADER SECTION */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 border-b border-zinc-800/50 pb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">
                            Workspace
                        </h1>
                        <p className="text-zinc-500 mt-2 font-medium">
                            Manage your productivity pipeline.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-bold uppercase tracking-widest text-zinc-300">
                            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'} Total
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT GRID */}
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* CREATE TASK PANEL */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-8">
                        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
                            <h2 className="text-zinc-100 font-semibold mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                                Quick Create
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="text-xs uppercase tracking-wider font-bold text-zinc-500 ml-1">Title</label>
                                    <input
                                        placeholder="Review quarterly goals..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full mt-1.5 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-wider font-bold text-zinc-500 ml-1">Description</label>
                                    <textarea
                                        placeholder="Details and context..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        className="w-full mt-1.5 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 placeholder-zinc-600 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                                >
                                    Create Task
                                </button>
                            </form>
                        </div>
                    </aside>

                    {/* TASK LIST FEED */}
                    <main className="lg:col-span-8 space-y-4">
                        {tasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-3xl p-20">
                                <div className="w-12 h-12 bg-zinc-800 rounded-full mb-4 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                <p className="text-zinc-500 font-medium">Your queue is empty.</p>
                            </div>
                        ) : (
                            tasks.map((task) => (
                                <div
                                    key={task._id}
                                    className="group relative bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all duration-300 shadow-sm"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="max-w-[70%]">
                                            <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-indigo-400 transition-colors">
                                                {task.title}
                                            </h3>
                                            <p className="text-zinc-500 mt-2 leading-relaxed text-sm">
                                                {task.description}
                                            </p>
                                        </div>

                                        {/* STATUS PILL */}
                                        <div className={`
                    flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                    ${task.status === "todo" && "bg-zinc-800 text-zinc-400 border border-zinc-700"}
                    ${task.status === "in_progress" && "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}
                    ${task.status === "done" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"}
                  `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${task.status === "todo" ? "bg-zinc-500" :
                                                    task.status === "in_progress" ? "bg-indigo-400" : "bg-emerald-400"
                                                }`} />
                                            {task.status.replace("_", " ")}
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-center pt-4 border-t border-zinc-800/50">
                                        <div className="flex-1 relative">
                                            <select
                                                value={task.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        task._id,
                                                        e.target.value as "todo" | "in_progress" | "done"
                                                    )
                                                }
                                                className="w-full appearance-none px-4 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-300 text-xs font-semibold focus:ring-2 focus:ring-indigo-500/20 outline-none cursor-pointer hover:border-zinc-700 transition-all"
                                            >
                                                <option value="todo">Move to Todo</option>
                                                <option value="in_progress">Set In Progress</option>
                                                <option value="done">Mark Done</option>
                                            </select>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                            title="Delete Task"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </main>
                </div>
            </div>
        </div>
    );


};

export default Home;
