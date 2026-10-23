"use client";

import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";

const STORAGE_KEY = "to-do-next-tasks";

export default function TodoApp() {
  // PERSIAPAN: Gunakan state ini untuk mengelola daftar tugas sesuai materi CRUD.
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create",
    task: null,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  function saveTask(values) {
    // TODO 1 : Tambahkan atau perbarui tugas berdasarkan mode modal.
    if (modalState.mode === "edit") {
      const updatedTasks = tasks.map((task) =>
        task.id === modalState.task.id ? {
          ...task, ...values
        } : task
      );
      setTasks(updatedTasks);
    } else {
      const newTask = {
        id: Date.now(),
        ...values,
        createdAt: new Date().toISOString(),
        done: false,
      };
      setTasks([newTask, ...tasks]);
    }
    closeModal();
  }

  function deleteTask(taskToDelete) {
    // TODO 2: Hapus tugas yang dipilih.
    setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    closeModal();
  }

  function toggleTask(taskId) {
    // TODO 3: Ubah status selesai tugas.
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task,
    );
    setTasks(updatedTasks);
  }

  function openCreateModal() {
    // PERSIAPAN: Buka modal dalam mode create.
    setModalState({ isOpen: true, mode: "create", task: null });
  }

  function openDetailModal(task) {
    // PERSIAPAN: Buka modal detail untuk tugas yang dipilih.
    setModalState({ isOpen: true, mode: "detail", task });
  }

  function openEditModal(task) {
    // PERSIAPAN: Buka modal dalam mode edit untuk tugas yang dipilih.
    setModalState({ isOpen: true, mode: "edit", task });
  }

  function closeModal() {
    // PERSIAPAN Tutup modal dan atur ulang modalState.
    setModalState({ isOpen: false, mode: "create", task: null });
  }

  useEffect(() => {
    // TODO 4: Baca daftar tugas dari localStorage setelah halaman dimuat.
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // TODO 5: Simpan daftar tugas ke localStorage setiap kali tasks berubah.
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  return (
    <main className="page-shell todo-page">
      <header className="todo-heading">
        <div>
          <p className="eyebrow">RUANG TUGAS</p>
          <h1>Daftar Tugas <span className="task-count">{tasks.length}</span></h1>
          <p className="page-description">Catat tugasmu dan tandai saat sudah selesai.</p>
        </div>
        <button className="button button-primary" type="button" onClick={openCreateModal}>
          <span className="button-plus" aria-hidden="true">+</span> Tambah Tugas Baru
        </button>
      </header>

      <section className="task-list" aria-label="Daftar tugas">
        {tasks.map((task) => (
          <article className={`task-card ${task.done ? "is-complete" : ""}`} key={task.id}>
            <input
              className="task-checkbox"
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
              aria-label={`Tandai ${task.title} selesai`}
            />
            <button className="task-title-button" type="button" onClick={() => openDetailModal(task)}>
              <span className={task.done ? "task-title completed" : "task-title"}>{task.title}</span>
              <span className="task-description">{task.description || "Tidak ada deskripsi"}</span>
            </button>
            <div className="task-actions">
              <span className={`priority-pill ${task.priority === "Penting" ? "priority-high" : ""}`}>
                {task.priority}
              </span>
              <button className="button button-secondary task-edit" type="button" onClick={() => openEditModal(task)}>
                Edit
              </button>
            </div>
          </article>
        ))}

        {tasks.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✓</span>
            <p className="empty-title">Belum ada tugas</p>
            <p>Tambahkan tugas pertamamu untuk mulai mengatur kegiatan.</p>
          </div>
        )}
      </section>

      {modalState.isOpen && (
        <TaskModal
          mode={modalState.mode}
          task={modalState.task}
          onClose={closeModal}
          onSave={saveTask}
          onDelete={deleteTask}
          onEdit={() => openEditModal(modalState.task)}
        />
      )}
    </main>
  );
}
