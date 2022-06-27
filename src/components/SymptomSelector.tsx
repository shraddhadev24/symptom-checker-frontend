import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import { useEffect } from "react";
import { getSymptoms } from "../service/service";

import _ from "lodash";
import { Button } from "@material-ui/core";

interface Option {
	_id: string;
	hpoId: string;
	hpoTerm: string;
}

const styles = {
	symptomConatainer: {
		margin: "20px !important",
		width: "100%",
	},
	autoComplete: {
		width: "80% !important",
		margin: "0 auto",
	},
	button: {
		height: "48px !important",
	},
};

const useStyles = makeStyles(styles);

const SymptomSelector = (props: {
	onSearchDisease: (arg: string[]) => void;
	clearDiseaseList: () => void;
}) => {
	const classes = useStyles();

	const [options, setOptions] = useState<Option[]>([]);
	const [selectedSymptoms, setSymptoms] = useState<string[]>([]);

	const fetchSymptoms = async (value: string) => {
		const symptomsData: any = await getSymptoms(value);
		console.log("Symptoms Data ", symptomsData?.data);
		setOptions(symptomsData?.data);
	};

	useEffect(() => {
		fetchSymptoms("");
	}, []);

	const onSearch = (value: string) => {
		fetchSymptoms(value);
	};

	const debounceSearch = _.debounce(onSearch, 250);

	const handleDiseaseSearch = async () => {
		props.onSearchDisease(selectedSymptoms);
	};

	const clearPrediction = async () => {
		props.clearDiseaseList();
	};
	return (
		<div className={classes.symptomConatainer}>
			<Autocomplete
				id='symptom-box-demo'
				options={options}
				className={classes.autoComplete}
				fullWidth
				multiple
				filterSelectedOptions
				onChange={(e: any, newValue: any) => {
					setSymptoms(newValue.map((symptom: Option) => symptom.hpoId));
					clearPrediction();
				}}
				getOptionLabel={(option) => `${option.hpoTerm} (${option.hpoId})`}
				style={{ width: 300 }}
				onInputChange={(e: any) => debounceSearch(e.target.value)}
				renderInput={(params) => (
					<TextField {...params} label='Search Symptom' variant='outlined' />
				)}
			/>
			<br />
			<Button
				disabled={!selectedSymptoms.length}
				variant='contained'
				color='primary'
				className={classes.button}
				onClick={handleDiseaseSearch}
			>
				Predict Disease
			</Button>
		</div>
	);
};

export default SymptomSelector;
