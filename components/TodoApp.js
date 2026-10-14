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

  function saveTask(values) {
    // TODO 1 : Tambahkan atau perbarui tugas berdasarkan mode modal.
  }

  function deleteTask(taskToDelete) {
    // TODO 2: Hapus tugas yang dipilih.
  }

  function toggleTask(taskId) {
    // TODO 3: Ubah status selesai tugas.
  }

  function openCreateModal() {
    // PERSIAPAN: Buka modal dalam mode create.
  }

  function openDetailModal(task) {
    // PERSIAPAN: Buka modal detail untuk tugas yang dipilih.
  }

  function openEditModal(task) {
    // PERSIAPAN: Buka modal dalam mode edit untuk tugas yang dipilih.
  }

  function closeModal() {
    // PERSIAPAN Tutup modal dan atur ulang modalState.
  }

  useEffect(() => {
    // TODO 4: Baca daftar tugas dari localStorage setelah halaman dimuat.
  }, []);

  useEffect(() => {
    // TODO 5: Simpan daftar tugas ke localStorage setiap kali tasks berubah.
  }, []);

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
