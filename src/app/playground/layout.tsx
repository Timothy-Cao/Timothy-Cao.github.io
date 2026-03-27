import Footer from "@/components/footer";

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
