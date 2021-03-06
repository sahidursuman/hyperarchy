# Generated by jeweler
# DO NOT EDIT THIS FILE DIRECTLY
# Instead, edit Jeweler::Tasks in Rakefile, and run the gemspec command
# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{erector}
  s.version = "0.8.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Alex Chaffee", "Brian Takita", "Jeff Dean", "Jim Kingdon"]
  s.date = %q{2010-08-11}
  s.default_executable = %q{erector}
  s.description = %q{Erector is a Builder-like view framework, inspired by Markaby but overcoming some of its flaws. In Erector all views are objects, not template files, which allows the full power of object-oriented programming (inheritance, modular decomposition, encapsulation) in views.}
  s.email = %q{erector@googlegroups.com}
  s.executables = ["erector"]
  s.extra_rdoc_files = [
    "README.txt"
  ]
  s.files = [
    "README.txt",
     "VERSION.yml",
     "bin/erector",
     "lib/erector.rb",
     "lib/erector/abstract_widget.rb",
     "lib/erector/after_initialize.rb",
     "lib/erector/caching.rb",
     "lib/erector/convenience.rb",
     "lib/erector/dependencies.rb",
     "lib/erector/dependency.rb",
     "lib/erector/erect/erect.rb",
     "lib/erector/erect/erected.rb",
     "lib/erector/erect/indenting.rb",
     "lib/erector/erect/rhtml.treetop",
     "lib/erector/errors.rb",
     "lib/erector/extensions/hash.rb",
     "lib/erector/extensions/object.rb",
     "lib/erector/externals.rb",
     "lib/erector/html.rb",
     "lib/erector/inline.rb",
     "lib/erector/jquery.rb",
     "lib/erector/mixin.rb",
     "lib/erector/needs.rb",
     "lib/erector/output.rb",
     "lib/erector/rails.rb",
     "lib/erector/rails/form_builder.rb",
     "lib/erector/rails/railtie.rb",
     "lib/erector/rails/template_handler.rb",
     "lib/erector/rails/widget_renderer.rb",
     "lib/erector/raw_string.rb",
     "lib/erector/sass.rb",
     "lib/erector/unicode.rb",
     "lib/erector/unicode_builder.rb",
     "lib/erector/version.rb",
     "lib/erector/widget.rb",
     "lib/erector/widgets.rb",
     "lib/erector/widgets/environment_badge.rb",
     "lib/erector/widgets/external_renderer.rb",
     "lib/erector/widgets/field_table.rb",
     "lib/erector/widgets/form.rb",
     "lib/erector/widgets/page.rb",
     "lib/erector/widgets/table.rb"
  ]
  s.homepage = %q{http://erector.rubyforge.org/}
  s.rdoc_options = ["--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubyforge_project = %q{erector}
  s.rubygems_version = %q{1.3.7}
  s.summary = %q{Html Builder library.}
  s.test_files = [
    "spec/erect",
     "spec/erect/erect_rails_spec.rb",
     "spec/erect/erect_spec.rb",
     "spec/erect/erected_spec.rb",
     "spec/erect/rhtml_parser_spec.rb",
     "spec/erector",
     "spec/erector/caching_spec.rb",
     "spec/erector/convenience_spec.rb",
     "spec/erector/dependency_spec.rb",
     "spec/erector/externals_spec.rb",
     "spec/erector/html_spec.rb",
     "spec/erector/indentation_spec.rb",
     "spec/erector/inline_spec.rb",
     "spec/erector/jquery_spec.rb",
     "spec/erector/mixin_spec.rb",
     "spec/erector/needs_spec.rb",
     "spec/erector/output_spec.rb",
     "spec/erector/sample-file.txt",
     "spec/erector/sass_spec.rb",
     "spec/erector/unicode_builder_spec.rb",
     "spec/erector/widget_spec.rb",
     "spec/erector/widgets",
     "spec/erector/widgets/field_table_spec.rb",
     "spec/erector/widgets/form_spec.rb",
     "spec/erector/widgets/page_spec.rb",
     "spec/erector/widgets/table_spec.rb",
     "spec/spec_helper.rb"
  ]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<treetop>, [">= 1.2.3"])
      s.add_runtime_dependency(%q<rake>, [">= 0"])
    else
      s.add_dependency(%q<treetop>, [">= 1.2.3"])
      s.add_dependency(%q<rake>, [">= 0"])
    end
  else
    s.add_dependency(%q<treetop>, [">= 1.2.3"])
    s.add_dependency(%q<rake>, [">= 0"])
  end
end

