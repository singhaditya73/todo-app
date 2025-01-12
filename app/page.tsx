'use client'

import { useState, useEffect } from 'react'
import type { Todo } from '@/types/todo'
import type { FormEvent, ChangeEvent } from 'react'

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState<string>('')

  useEffect(() => {
    getTodos()
  }, [])

  async function getTodos(): Promise<void> {
    try {
      const res = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    }
  }

  async function addTodo(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: newTodo })
      })
      if (!res.ok) throw new Error('Failed to add todo')
      const todo = await res.json()
      setTodos([...todos, todo])
      setNewTodo('')
    } catch (error) {
      console.error('Failed to add todo:', error)
    }
  }

  async function deleteTodo(id: number): Promise<void> {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error('Failed to delete todo')
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Todo List</h1>

      <form onSubmit={addTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="border p-2 py-2 rounded w-full bg-white mb-4 text-slate-900"
        />
        <div className="flex justify-center">
        <button
        type="submit"
        className="bg-blue-500  text-white px-2 py-2 rounded hover:bg-blue-600 ">
          Add Todo
        </button>
        </div>
      </form>

      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id} className="flex items-center gap-2 border-b py-2">
            <span>{todo.body}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}