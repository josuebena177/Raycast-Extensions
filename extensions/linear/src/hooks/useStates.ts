import { getLinearClient } from "../helpers/withLinearClient";
import { useCachedPromise } from "@raycast/utils";

export default function useStates(teamId?: string, config?: { execute?: boolean }) {
  const { linearClient } = getLinearClient();

  const {
    data: allStates,
    error: allStatesError,
    isLoading: isLoadingAllStates,
  } = useCachedPromise(
    async () => {
      const states = await linearClient.workflowStates();
      return states.nodes;
    },
    [],
    {
      initialData: [],
      execute: config?.execute !== false,
    }
  );

  const {
    data: states,
    error: statesError,
    isLoading: isLoadingStates,
  } = useCachedPromise(
    async (teamId: string | undefined) => {
      const states = await linearClient.workflowStates({ filter: { team: { id: { eq: teamId } } } });
      return states.nodes.sort((a, b) => a.position - b.position);
    },
    [teamId],
    {
      initialData: [],
      execute: config?.execute !== false,
    }
  );

  return { allStates, states, isLoadingAllStates, isLoadingStates, allStatesError, statesError };
}
