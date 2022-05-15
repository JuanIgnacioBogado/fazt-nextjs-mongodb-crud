import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, Form, Grid } from 'semantic-ui-react';

export default function TaskFormPage() {
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const [errors, setErrors] = useState({});
    const { query: { id }, push } = useRouter();

    const validate = () => {
        const errors = {};

        if (!task.title.trim()) errors.title = 'Title is required';
        if (!task.description.trim()) errors.description = 'Description is required';

        return errors;
    }

    const createTask = async () => {
        try {
            await fetch('http://localhost:3000/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const editTask = async () => {
        try {
            await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(task)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const errors = validate();

        if (Object.keys(errors).length) return setErrors(errors);
        setErrors({});

        if (id) {
            editTask();
        } else {
            createTask();
        }
        push('/');
    }

    const handleChange = ({ target }) => setTask({ ...task, [target.name]: target.value });

    const getTask = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
            if (res.status !== 200) {
                push('/');
            }
            const data = await res.json();
            setTask(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id) {
            getTask()
        } else {
            setTask({ title: '', description: '' });
        };
    }, [id])

    return (
        <Grid
            centered
            verticalAlign="middle"
            columns="3"
            style={{ height: "80vh" }}
        >
            <Grid.Row>
                <Grid.Column textAlign="center">
                    <h1>{id ? 'Update Task' : 'Create Task'}</h1>

                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            name="title"
                            label="Title"
                            placeholder="Title"
                            onChange={handleChange}
                            value={task.title}
                            error={errors.title && {
                                content: errors.title,
                                pointing: 'below'
                            }}
                        />
                        <Form.TextArea
                            name="description"
                            label="Description"
                            placeholder="Description"
                            onChange={handleChange}
                            value={task.description}
                            error={errors.description && {
                                content: errors.description,
                                pointing: 'below'
                            }}
                        />
                        <Button primary>{id ? 'Update' : 'Create'}</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
