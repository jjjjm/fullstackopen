import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onlick, text }) => (
    <button onClick={onlick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}


const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad
    if (total === 0) {
        return (
            <div>
                {"No feedback given"}
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic text="good" value={good} />
                <Statistic text="neutral" value={neutral} />
                <Statistic text="bad" value={bad} />
                <Statistic text="total" value={total} />
                <Statistic text="average" value={(good - bad) / total} />
                <Statistic text="positive" value={(good / total) * 100 + " %"} />
            </tbody>
        </table>
    )
}

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header text="give feedback" />
            <Button onlick={() => setGood(good + 1)} text="good" />
            <Button onlick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button onlick={() => setBad(bad + 1)} text="bad" />
            <Header text="statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
