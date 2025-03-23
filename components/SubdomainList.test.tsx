import { render, screen } from "@testing-library/react";
import SubdomainList from "@/components/SubdomainList"; // adjust if path differs
import { describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom'

vi.mock("./DeleteSubdomain", () => ({
  DeleteSubdomainButton: ({ subdomainId }: { subdomainId: string }) => (
    <button>Mock Delete Button ({subdomainId})</button>
  ),
}));

const mockSubdomains = [
  {
    _id: "1",
    name: "School One",
    subDomain: "school1",
    description: "First school description",
  },
  {
    _id: "2",
    name: "School Two",
    subDomain: "school2",
    description: "Second school description",
  },
];

describe("SubdomainList Component", () => {
  it("renders a list of subdomains correctly", async () => {
    render(<SubdomainList subdomains={mockSubdomains} />);

    expect(screen.getByText("School One")).toBeInTheDocument();
    expect(screen.getByText("School Two")).toBeInTheDocument();

    expect(
      screen.getByText("First school description")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Second school description")
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Configure Content/i)).toHaveLength(2);
    expect(screen.getAllByText(/Visit →/i)).toHaveLength(2);
    expect(screen.getByText("Mock Delete Button (1)")).toBeInTheDocument();
    expect(screen.getByText("Mock Delete Button (2)")).toBeInTheDocument();
  });
});
