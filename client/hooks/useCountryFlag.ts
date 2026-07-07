import { useQuery } from "@tanstack/react-query";

export function useCountryFlag(countryId: string | number | null) {
  return useQuery({
    queryKey: ["flag", countryId],
    queryFn: async () => {
      if (!countryId) return null;

      const response = await fetch(`/api/flag?countryId=${countryId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch flag for country ${countryId}`);
      }

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    },
    enabled: !!countryId,
    staleTime: Infinity,
  });
}
