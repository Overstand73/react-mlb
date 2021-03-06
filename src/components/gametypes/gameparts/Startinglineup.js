import React from 'react';
import { Link } from 'react-router-dom';

class Startinglineup extends React.Component {
	constructor() {
		super();
		this.state = {
			lineups: [],
			isLoading: true
		}
	}

	componentWillMount() {
		// for info
		fetch(`https://statsapi.mlb.com/api/v1/schedule?
			gamePk=${this.props.data.gamePk}&language=en&hydrate=lineups,&useLatestGames=true&fields=dates,games,note,id,dates,games,homeAway,isNational,dates,games,game,dates,games,lineups,homePlayers,awayPlayers,
			useName,lastName,primaryPosition,abbreviation`)
			.then(res => res.json())
			.then(res => {
				this.setState({
					lineups: res.dates[0].games[0].lineups,
					isLoading: false
				});
			});
	}

	render() {
		let awayLineup;
		let homeLineup;
		let awayNum = 1;
		let homeNum = 1;
		if (!this.state.isLoading && this.state.lineups) {
			if (this.state.lineups.awayPlayers) {
				awayLineup = this.state.lineups.awayPlayers.map(batter => {
				return (
					<tr key={batter.id}>
						<td>{awayNum++} <Link to={`/player/${batter.id}`}>{batter.lastName}, {batter.useName}</Link><b> {batter.primaryPosition.abbreviation}</b></td>
					</tr>
					)
				});
			} else {
				awayLineup = <tr><td>Lineup not yet set</td></tr>
			}
			if (this.state.lineups.homePlayers) {
				homeLineup = this.state.lineups.homePlayers.map(batter => {
				return (
					<tr key={batter.id}>
						<td>{homeNum++} <Link to={`/player/${batter.id}`}>{batter.lastName}, {batter.useName}</Link><b> {batter.primaryPosition.abbreviation}</b></td>
					</tr>
					)
				});
			} else {
				homeLineup = <tr><td>Lineup not yet set</td></tr>
			}
		} else {
			awayLineup = <tr><td>Lineup not yet set</td></tr>
			homeLineup = <tr><td>Lineup not yet set</td></tr>
		}
		return (
			<div className="starting-lineup">
				<table>
					<thead>
						<tr>
							<th>{this.props.data.liveData.boxscore.teams.away.team.name}</th>
						</tr>
					</thead>
					<tbody>
						{awayLineup}
					</tbody>
				</table>
				<table>
					<thead>
						<tr>
							<th>{this.props.data.liveData.boxscore.teams.home.team.name}</th>
						</tr>
					</thead>
					<tbody>
						{homeLineup}
					</tbody>
				</table>
			</div>
			)
	}
}

export default Startinglineup;