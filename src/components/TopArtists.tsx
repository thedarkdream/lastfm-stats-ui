import React from 'react';
import { ArtistListensDto } from '../dto/ArtistListensDto';

interface ArtistListenProps {
    entries?: Array<ArtistListensDto>
}

function TopArtists(props: ArtistListenProps) {
    return <div className="topArtists">
        <table>
            {!props.entries && <div>No data fetched for top artists.</div>}
            {props.entries?.map((entry) => <Entry artist={entry.artist} listens={entry.listens} />)}
        </table>
</div>
}

function Entry(props: ArtistListensDto) {
    return <tr v-for="artist in artists">
               <td>{props.artist}</td>
               <td>{props.listens.toString()}</td>
           </tr>
}
export default TopArtists;
