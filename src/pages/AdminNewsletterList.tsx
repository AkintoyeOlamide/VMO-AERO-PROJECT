import React, { useEffect, useState } from 'react';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';

interface NewsletterSignup {
  email: string;
  subscribedAt?: string;
}

const AdminNewsletterList: React.FC = () => {
  const [signups, setSignups] = useState<NewsletterSignup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSignups = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'newsletter_subscribers'));
        const data: NewsletterSignup[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
          email: doc.data().email,
          subscribedAt: doc.data().subscribedAt,
        }));
        setSignups(data);
      } catch (error) {
        setSignups([]);
      }
      setLoading(false);
    };
    fetchSignups();
  }, []);

  return (
    <div className="p-8 min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-navy mb-8 text-center tracking-wide">Newsletter Signups</h2>
        {loading ? (
          <div className="text-navy text-center py-8">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left text-lg font-bold text-navy border-b border-gray-300">Email</th>
                  <th className="py-3 px-4 text-left text-lg font-bold text-navy border-b border-gray-300">Signup Date</th>
                </tr>
              </thead>
              <tbody>
                {signups.length === 0 && (
                  <tr>
                    <td colSpan={2} className="text-center py-8 text-gray-500 text-lg">No signups found.</td>
                  </tr>
                )}
                {signups.map((signup, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800 border-b border-gray-200">{signup.email}</td>
                    <td className="py-3 px-4 text-gray-800 border-b border-gray-200">{signup.subscribedAt ? new Date(signup.subscribedAt).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewsletterList; 