const demoData = {
  nodes: [
    {
      id: "circuit-1.200",
      label: "Circuit 1.200",
      children: [],
    },
    {
      id: "server-1.100",
      label: "Server 1.100",
      children: [{ id: "eth0.100", label: "eth0.100", parent: "server-1.100" }],
    },
    {
      id: "router-2.100",
      label: "Router 2.100",
      children: [],
    },
    { id: "laptop-12.30", label: "Laptop 12.30", children: [] },
    {
      id: "server-1.200",
      label: "Server 1.200",
      children: [{ id: "eth0.200", label: "eth0.200", parent: "server-1.200" }],
    },

    { id: "phone-20.24", label: "Phone 20.24", children: [] },
  ],
  edges: [
    { source: "circuit-1.200", target: "server-1.100", label: "34.1.2.3" },
    { source: "circuit-1.200", target: "router-2.100", label: "35.20.30.1" },
    { source: "circuit-1.200", target: "laptop-12.30", label: "35.40.50.1" },
    { source: "circuit-1.200", target: "server-1.200", label: "34.1.2.3" },
    { source: "circuit-1.200", target: "phone-20.24", label: "35.3.4.5" },
  ],
};
