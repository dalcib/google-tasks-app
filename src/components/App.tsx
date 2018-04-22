import * as React from 'react';

import { AppBar } from './AppBar';
import { LinearProgress } from './LinearProgress';
import { Menu } from './Menu';
import { TaskListViewContainer } from '../containers/TaskListView';
import { ActionButton } from './ActionButton';
import { TaskList } from '../models/TaskList';
import { Task } from '../models/Task';

interface AppProps {
    isLoading?: boolean;
    taskLists?: TaskList[];
    onStart?: () => void;
    onSelectList?: (taskListId: string) => void;
    onAddTask?: (taskListId: string) => void;
}

interface AppState {
    openMenu: boolean;
    taskListId: string;
}

class App extends React.Component<AppProps, AppState> {

    componentWillMount(): void {
        this.start();
    }

    componentWillReceiveProps(nextProps: AppProps): void {
        const {
            taskLists,
            isLoading
        } = nextProps;

        const isNotLoading = isLoading === false;
        const hasTaskLists = taskLists.length;
        const haventSelectedList = this.state.taskListId === null;

        if (
            isNotLoading
            && hasTaskLists
            && haventSelectedList
        ) {
            this.selectList(taskLists[0].id);
        }
    }

    render(): React.ReactElement<any> | false {
        const {
            isLoading,
            taskLists,
            onSelectList,
            onAddTask,
        } = this.props;

        const {
            openMenu,
            taskListId
        } = this.state;

        if (isLoading) {
            return (
                <section className="app">
                    <LinearProgress />
                </section>
            );
        }

        return (
            <section className="app">
                <AppBar
                    onMenuClick={() => this.toggleMenu()}
                />
                <Menu
                    taskLists={taskLists}
                    open={openMenu}
                    onCloseMenu={() => this.toggleMenu()}
                    onSelectList={taskListId => this.selectList(taskListId)}
                />
                <TaskListViewContainer taskListId={taskListId} />
                <ActionButton onClick={() => this.addTask()} />
            </section>
        );
    }

    private start(): void {
        const { onStart } = this.props;
        this.setState({ openMenu: false, taskListId: null });
        onStart();
    }

    private toggleMenu(): void {
        this.setState({ openMenu: !this.state.openMenu });
    }

    private selectList(taskListId: string) {
        const { onSelectList } = this.props;
        this.setState({ taskListId });
        onSelectList(taskListId);
    }

    private addTask(): void {
        const { onAddTask } = this.props;
        const { taskListId } = this.state;
        onAddTask(taskListId);
    }

}


export { App, AppProps }