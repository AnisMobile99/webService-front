import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { dateParser } from "../utils/parser";

type ListUserType = {
	email: string;
	firstname: string;
	lastname: string;
	id: string;
	phoneNumber: string;
	createdAt: { _seconds: number; _nanoseconds: number };
}[];

type UsersListProps = {
	title: string;
	data: ListUserType | null;
};

const UsersList: React.FC<UsersListProps> = ({ title, data }) => {
	const navigate = useNavigate();

	return (
		<>
			<Title>{title}</Title>
			{data ? (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Prénom</TableCell>
							<TableCell>Nom</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Téléphone</TableCell>
							<TableCell>Date de création</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds)
							.map((user) => (
								<TableRow
									key={user.id}
									onClick={() => navigate("/user/" + user.id)}
								>
									<TableCell>{user.id}</TableCell>
									<TableCell>{user.firstname}</TableCell>
									<TableCell>{user.lastname}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.phoneNumber}</TableCell>
									<TableCell>{dateParser(user.createdAt._seconds)}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			) : (
				<Loading />
			)}
		</>
	);
};

export default UsersList;
