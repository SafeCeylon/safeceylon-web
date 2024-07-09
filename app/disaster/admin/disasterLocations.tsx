import DisasterNavbar from "@/components/DisasterNavbar"

export default function DisasterLocations() {
    return (
        <div className="bg-primary h-screen" >
            <DisasterNavbar active="disasterLocations" />
            <h1>Disaster Locations</h1>
        </div>
    );
}