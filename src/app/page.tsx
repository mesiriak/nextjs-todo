'use client'

import {Input} from "@/components/ui/input";
import {DatePicker} from "@/components/ui/date-picker";
import {Button} from "@/components/ui/button";

import React, {ChangeEvent, ComponentPropsWithoutRef} from "react";
import {Header} from "@/components/header";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

type TodoItem = {
    id: number
    title: string
    date: Date | undefined
    isDone: boolean | undefined
}

interface TodoInteractionPanelProps extends ComponentPropsWithoutRef<"div"> {
    counter: number
    setCounter: React.Dispatch<React.SetStateAction<number>>
    todoList: TodoItem[]
    setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>
}

const TodoInteractionPanel: React.FC<TodoInteractionPanelProps> = ({counter, setCounter, todoList, setTodoList}) => {
    const [todoTitle, setTodoTitle] = React.useState<string>("")
    const [todoDate, setTodoDate] = React.useState<Date>()

    const newTodoItem: TodoItem = {
        id: counter,
        title: todoTitle,
        date: todoDate,
        isDone: false
    }

    return (
        <div className={'flex gap-1'}>
            <Input
                placeholder="Make a sandwich..."
                type='text'
                value={todoTitle}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setTodoTitle(event.target.value)}
            />
            <DatePicker
                date={todoDate}
                setDate={setTodoDate}
            />
            <Button onClick={
                () => {
                    setTodoList([...todoList, newTodoItem])
                    setCounter((prev) => prev + 1)
                }
            }>Add TODO</Button>
        </div>
    )
}

export default function Home() {
    const [idCounter, setIdCounter] = React.useState(1);
    const [todoList, setTodoList] = React.useState<TodoItem[]>([])

  return (
      <>
          <Header/>
          <main className={'container'}>
              <TodoInteractionPanel
                  counter={idCounter}
                  setCounter={setIdCounter}
                  todoList={todoList}
                  setTodoList={setTodoList}
              />
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Is done?</TableHead>
                          <TableHead></TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {todoList.map((todo, index) => {
                          return (
                              <TableRow key={todo.id}>
                                  <TableCell>{todo.title}</TableCell>
                                  <TableCell>{todo.date ? todo.date.toDateString() : (new Date()).toDateString()}</TableCell>
                                  <TableCell className="text-right">
                                      <Input type={"checkbox"} defaultChecked={todo.isDone ? todo.isDone : false} onInput={
                                          () => {
                                              todoList[index].isDone = !todo.isDone
                                              setTodoList([...todoList])
                                          }
                                      }></Input>
                                  </TableCell>
                                  <TableCell>
                                      <Button onClick={() => {
                                          todoList.splice(index, 1)
                                          setTodoList([...todoList])
                                      }}>Delete</Button>
                                  </TableCell>
                              </TableRow>
                          )
                      })}
                  </TableBody>
              </Table>
          </main>
      </>

  );
}
