const Navbar = () => {
  return (
    <div className="flex justify-between py-2 px-2 text-base">
      <div className="text-xl sm:text-2xl font-medium font-sec">
        Arihant Kamde
      </div>
      <div className="flex gap-5">
        <div>Experience</div>
        <div>Projects</div>
        <div className="hidden sm:block">Contact Me</div>
      </div>
    </div>
  );
};

export default Navbar;
