"use client";
import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { deleteListingFromFirestore } from "@/utils/firestoreUtils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ListingCard from "@/components/ListingCard";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AllListings() {
  const [user] = useAuthState(auth);
  const [listings, setListings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchAllListings = async () => {
      try {
        const listingsQuery = query(
          collection(db, "listings"),
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        const listingsSnapshot = await getDocs(listingsQuery);
        setListings(
          listingsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (error) {
        setError("Failed to fetch listings");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllListings();
  }, [userId]);

  const handleDelete = async (listingId) => {
    try {
      await deleteListingFromFirestore(listingId);
      setListings(listings.filter((listing) => listing.id !== listingId));
      setDeleteMessage("Listing successfully deleted");
      setTimeout(() => setDeleteMessage(null), 3000);
    } catch (error) {
      console.error("Error deleting listing:", error);
      setError("Failed to delete listing");
    }
  };

  const handleEdit = (listingId) => {
    router.push(`/edit-listing?listingId=${listingId}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/profile"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Your Listings</h1>
        {deleteMessage && (
          <p className="text-green-500 text-center">{deleteMessage}</p>
        )}

        {listings.length === 0 ? (
          <p className="text-center text-gray-600">
            No listings available. Create your first listing!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}