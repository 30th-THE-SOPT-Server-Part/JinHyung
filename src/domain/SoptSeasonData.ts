type SoptSeasonData = {
    season: number,
    group: string[],
    part: string[],
    president: string
}

export default function SoptSeasonData(o: any): o is SoptSeasonData {
    return "season" in o && "group" in o && "part" in o && "president" in o
}