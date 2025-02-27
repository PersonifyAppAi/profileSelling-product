"use client";

import React from "react";
import { ProfileData } from "@/models/Profile";

interface StudentProfileProps {
  profile: ProfileData;
  isLocked: boolean;
}

export default function StudentProfile({ profile, isLocked }: StudentProfileProps) {
  if (!profile) {
    return <div>No profile available.</div>;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
      <h2>{profile.name}</h2>
      <p><strong>Major:</strong> {profile.major}</p>
      <p><strong>School Type:</strong> {profile.schoolType}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>

      {isLocked ? (
        <div style={{ color: "red" }}>
          <p>This profile is locked. Please unlock to view full details.</p>
        </div>
      ) : (
        <>
          <h3>Detailed Information</h3>
          <p><strong>Race:</strong> {profile.race}</p>
          <p><strong>Gender:</strong> {profile.gender}</p>
          <p><strong>Legacy:</strong> {profile.legacy ? "Yes" : "No"}</p>
          <p><strong>Accepted Schools:</strong> {profile.acceptedSchools.join(", ")}</p>
          {/* You would show essays, extracurriculars, etc., here */}
        </>
      )}
    </div>
  );
}
