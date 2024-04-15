export default interface Task {
  id?: number;
  title: string | null;
  description: string | null;
  startDate: any;
  completeDate: any;
  status: string | null;
}

