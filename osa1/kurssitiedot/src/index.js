import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <h1>
            {props.course.name}
        </h1>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.course.parts.map(part => <Part name={part.name} exercises={part.exercises} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    )
}

const Total = (props) => {
    const totalSum = function (listOfAll) {
        let sum = 0
        listOfAll.forEach(element => {
            sum += element
        });
        return sum
    }
    return (
        <p>
            Number of exercises {totalSum(props.course.parts.map(part => part.exercises))}
        </p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))