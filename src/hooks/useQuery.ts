"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bkend } from "@/lib/bkend";

export function useBkendList(table: string, params?: Record<string, string>) {
  return useQuery({
    queryKey: [table, params],
    queryFn: () => bkend.data.list(table, params),
  });
}

export function useBkendGet(table: string, id: string) {
  return useQuery({
    queryKey: [table, id],
    queryFn: () => bkend.data.get(table, id),
    enabled: !!id,
  });
}

export function useBkendCreate(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: unknown) => bkend.data.create(table, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}

export function useBkendUpdate(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: unknown }) =>
      bkend.data.update(table, id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}

export function useBkendDelete(table: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bkend.data.delete(table, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [table] });
    },
  });
}
