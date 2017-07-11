module Jekyll
  class ArmAsmTag < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      ref = context.registers[:site].data["reference"]
      idx = ref.index{|i| i["name"] == @text[0,3]}
      if idx
        doc = ref[idx]
        "<div class=\"hint--html\"><code class=\"asm-ref\">
        #{doc["name"]}
        </code><div class=\"hint__content\">
        <dl>
        <dt>syntax</dt><dd><pre>#{CGI::escapeHTML(doc["syntax"])}</pre></dd>
        <dt>semantic</dt><dd><pre>#{CGI::escapeHTML(doc["semantic"])}</pre></dd>
        <dt>flags affected</dt><dd>#{doc["flags"]}</dd>
        <dt>description</dt><dd>#{doc["description"]}</dd>
        <dt>examples</dt><dd><pre><code>#{doc["examples"]}</code></pre></dd>
        </dl>
        </div>
        </div>"
      else
        "#{@text}"
      end
    end
  end
end

Liquid::Template.register_tag('arm_asm', Jekyll::ArmAsmTag)
