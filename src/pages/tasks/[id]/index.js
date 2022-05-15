import { useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { Button, Grid, Confirm, Loader } from 'semantic-ui-react';

export default function TaskDetail({ task, error }) {
    if (error?.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />;

    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { query: { id }, push } = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);
        setConfirm(false);
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, {method: 'DELETE'})
        } catch (error) {
            console.error(error);
        }
        push('/');
    }

    return (
        <Grid
            centered
            verticalAlign="middle"
            columns="3"
            style={{ height: "80vh" }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    <div>
                        <Button
                            color="red"
                            loading={isDeleting}
                            disabled={isDeleting}
                            onClick={() => setConfirm(true)}
                        >
                            Delete
                        </Button>
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Confirm
                header="Please confirm"
                content="Are you sure you want to delete this task?"
                open={confirm}
                onConfirm={handleDelete}
                onCancel={() => setConfirm(false)}
            />
        </Grid>
    )
}

export const getServerSideProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (res.status === 200) {
        const task = await res.json();
        return {
            props: {
                task
            }
        }
    }

    return {
        props: {
            error: {
                statusCode: res.status,
                statusText: 'Invalid ID'
            }
        }
    }
}