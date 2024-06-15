import Header from './Header'
import Part from './Part'

const Course = (props) => {
    const { course: { parts, name } } = props;

    const total = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)

    return (
        <> 
            <Header name={name} />
            <ul>
                {parts.map(part =>
                    <Part key={part.id} part={part} />
                )}
            </ul>
            <p>total of {total} exercises</p>
        </>
    )
}

export default Course