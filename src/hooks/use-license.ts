import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export function useLicense() {
  const { data: session, status } = useSession();
  const [hasLicense, setHasLicense] = useState(false);
  const [licenseType, setLicenseType] = useState<'none' | 'individual' | 'team'>('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkLicense() {
      if (status === 'loading') {
        return;
      }

      if (!session?.user?.id) {
        setHasLicense(false);
        setLicenseType('none');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/license/check');
        if (response.ok) {
          const data = await response.json();
          setHasLicense(data.hasLicense);
          setLicenseType(data.licenseType);
        }
      } catch (error) {
        console.error('Error checking license:', error);
        setHasLicense(false);
        setLicenseType('none');
      } finally {
        setLoading(false);
      }
    }

    checkLicense();
  }, [session, status]);

  return {
    hasLicense,
    licenseType,
    loading: status === 'loading' || loading,
  };
}
