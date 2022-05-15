import { Button, Card, Container, Grid } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const HomePage = ({ tasks }) => {
    const router = useRouter();

    if (!tasks.length) return (
        <Grid 
            centered
            verticalAlign="middle"
            columns="1"
            style={{ height: "80vh" }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>There are no tasks yer</h1>
                    <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" alt="No tasks yet" />
                    <div>
                        <Button primary onClick={() => router.push('tasks/new')}>
                            Create a Task
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
    return (
        <Container style={{padding: '20px'}}>
            <Card.Group itemsPerRow={4}>
                {tasks.map(task => (
                    <Card key={task._id}>
                        <Card.Content>
                            <Card.Header>{task.title}</Card.Header>
                            <p>{task.description}</p>
                        </Card.Content>
                        <Card.Content extra>
                            <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
                            <Button primary onClick={() => router.push(`/tasks/${task._id}/edit`)}>Edit</Button>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    )
}

export const getServerSideProps = async ctx => {
    const res = await fetch('http://localhost:3000/api/tasks');
    const tasks = await res.json();
    console.log(tasks);

    return {
        props: {
            tasks
        }
    }
}

export default HomePage;