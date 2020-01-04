import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ course }) => {
    return (
        <h2>
            {course.name}
        </h2>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part part={part} key={part.id} />)}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((total, part) => total += part.exercises, 0)
    return (
        <b>
            {"total of"} {total} {"exercises"}
        </b>
    )
}

export default Course