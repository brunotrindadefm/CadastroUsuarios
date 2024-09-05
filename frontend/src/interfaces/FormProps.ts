import { User } from "./User";

export interface FormProps {
    onNewUser: (user: User | undefined) => void;
}
