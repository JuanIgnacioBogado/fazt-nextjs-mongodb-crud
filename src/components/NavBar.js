import { Menu, Container, Button } from 'semantic-ui-react';
import Link from 'next/link';

export default () => (
    <Menu inverted attached borderless>
        <Container>
            <Menu.Item className="cursor-pointer">
                <Link href="/">
                    <img src="/favicon.ico" alt="favicon" />
                </Link>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item >
                    <Link href="/tasks/new">
                        <Button primary size="mini">
                            New Task
                        </Button>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Container>
    </Menu>
);
