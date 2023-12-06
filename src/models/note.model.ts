import ITask from './task.model';
export default interface INote {
  id: string;
  title: string;
  tasks?: ITask[];
  text?: string;
  created_at?: Date;
  updated_at?: Date;
  type: 'note' | 'list';
  color:
    | 'red'
    | 'blue'
    | 'green'
    | 'yellow'
    | 'orange'
    | 'purple'
    | 'pink'
    | 'gray'
    | 'brown';
  isDelete?: boolean;
  isFavorite?: boolean;
  isArchived?: boolean;
}
