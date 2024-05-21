const Header = (props) => {
    return <h2>{props.course}</h2>
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(part => <Part part={part} />)}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => {
    const total = props.parts.map(part => part.exercises).reduce((s, p) => s + p, 0)
    return <h3>total of {total} exercises</h3>
}


const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course