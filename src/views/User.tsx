import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	Paper,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase";
import {
	getUser,
	updateStatusCoachDegree,
	updateStatusCoachDocument,
} from "../utils/axios";
import Loading from "../components/Loading";

const User = () => {
	const { uid } = useParams();
	const currentUser = useAuth();
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);

	const fetchUserData = () => {
		if (!currentUser || !uid) return;
		setLoading(true);
		getUser(currentUser.accessToken, uid)
			.then((res) => {
				console.log(res);
				setUserData(res.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchUserData();
	}, [currentUser]);

	return (
		<Box component="section">
			<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
				{loading ? (
					<Loading />
				) : !userData ? (
					<span>Erreur de chargement</span>
				) : (
					<Box>
						<Typography variant="h4">
							{userData.firstname} {userData.lastname}
						</Typography>
						{/* DEGREES */}
						<Grid container spacing={6}>
							<Grid item xs={12}>
								<Typography variant="h5">Diplômes</Typography>
								<Grid container spacing={3}>
									{userData.degrees.map((degree) => (
										<Grid item key={degree.id}>
											<Card sx={{ maxWidth: 345 }}>
												<CardMedia sx={{ objectFit: "cover" }}>
													<img
														src={degree.fileURL}
														alt="image degree"
														style={{ height: "100%", width: "100%" }}
													/>
												</CardMedia>
												<CardContent>
													<Typography variant="h5" component="div">
														{degree.name}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{degree.schoolName}, {degree.speciality},{" "}
														{new Date(degree.date).toLocaleDateString()}
													</Typography>
												</CardContent>
												{degree.status === "verified" && (
													<Chip label="Vérifié" color="success" sx={{ m: 1 }} />
												)}
												{degree.status === "refused" && (
													<Chip label="Refusé" color="error" />
												)}
												{degree.status === "pending" && (
													<CardActions>
														<Button
															onClick={() =>
																updateStatusCoachDegree(
																	currentUser!.accessToken,
																	uid,
																	degree.id,
																	"verified"
																).then(() => fetchUserData())
															}
														>
															Valider
														</Button>
														<Button
															onClick={() =>
																updateStatusCoachDegree(
																	currentUser!.accessToken,
																	uid,
																	degree.id,
																	"refused"
																).then(() => fetchUserData())
															}
														>
															Refuser
														</Button>
													</CardActions>
												)}
											</Card>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
						{/* LEGAL DOCUMENTS */}
						<Grid container spacing={6}>
							<Grid item xs={12}>
								<Typography variant="h5">Documents légaux</Typography>
								<Grid container spacing={3}>
									{userData.legalDocuments.map((document) => (
										<Grid item key={document.id}>
											<Card sx={{ maxWidth: 345 }}>
												<CardMedia sx={{ objectFit: "cover" }}>
													<img
														src={document.fileURL}
														alt="image document"
														style={{ height: "100%", width: "100%" }}
													/>
												</CardMedia>
												<CardContent>
													<Typography variant="h5" component="div">
														{document.type}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														{new Date(document.addedAt).toLocaleDateString()}
													</Typography>
												</CardContent>
												{document.status === "verified" && (
													<Chip label="Vérifié" color="success" sx={{ m: 1 }} />
												)}
												{document.status === "refused" && (
													<Chip label="Refusé" color="error" sx={{ m: 1 }} />
												)}
												{document.status === "pending" && (
													<CardActions>
														<Button
															onClick={() =>
																updateStatusCoachDocument(
																	currentUser!.accessToken,
																	uid,
																	document.id,
																	"verified"
																).then(() => fetchUserData())
															}
														>
															Valider
														</Button>
														<Button
															onClick={() =>
																updateStatusCoachDocument(
																	currentUser!.accessToken,
																	uid,
																	document.id,
																	"refused"
																).then(() => fetchUserData())
															}
														>
															Refuser
														</Button>
													</CardActions>
												)}
											</Card>
										</Grid>
									))}
								</Grid>
							</Grid>
						</Grid>
					</Box>
				)}
			</Paper>
		</Box>
	);
};

export default User;
